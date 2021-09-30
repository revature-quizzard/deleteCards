package com.revature.delete_card.Repositories;

import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.revature.delete_card.Documents.Set;
import com.revature.delete_card.Documents.User;
import com.revature.delete_card.Execptions.InvalideRequestException;
import com.revature.delete_card.Execptions.ResourceNotFoundException;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class UserRepository {
    private final DynamoDbTable<User> userTable;

    public UserRepository(){
        DynamoDbClient db = DynamoDbClient.builder().httpClient(ApacheHttpClient.create()).build();
        DynamoDbEnhancedClient dbClient = DynamoDbEnhancedClient.builder().dynamoDbClient(db).build();
        userTable = dbClient.table("Users", TableSchema.fromBean(User.class));

    }

    /**
     * Gets all users from the Users table
     * @Authors Alfonso Holmes
     */
    public List<User> getAllUsers(){
        System.out.println("FROM USER REPOSITORY : " + userTable.scan().items().stream().collect(Collectors.toList()));
        if(userTable.scan().items().stream().collect(Collectors.toList()) == null){ throw new InvalideRequestException("Null List"); }

        return userTable.scan().items().stream().collect(Collectors.toList());
    }

    /**
     * Gets a given user from the Users table by username
     * @Authors Alfonso Holmes
     * @param name
     */
    public User getUser(String name) {
        AttributeValue val = AttributeValue.builder().s(name).build();
        Expression filter = Expression.builder().expression("#a = :b").putExpressionName("#a", "username") .putExpressionValue(":b", val).build();
        ScanEnhancedRequest request = ScanEnhancedRequest.builder().filterExpression(filter).build();
        User user = userTable.scan(request).items().stream().findFirst().orElseThrow(ResourceNotFoundException::new);
        System.out.println("USER WITH ID: " + user);
        return user;
    }

    /**
     * Handles referential integrity by removing the given updated set from all users created_sets and favorited_sets lists
     * @Authors  Alfonso Holmes
     * @param updated_set
     */

    public void updateUserCollections(Set updated_set) {
        //get rid of set from author's created_sets and all users favorite_sets
        List<User> users = getAllUsers();

        // if there are no users throw exception
        if(users.size() == 0) { throw new ResourceNotFoundException(); }
        // if there is only one user and they have not created or favorite sets or either set has no cards throw exception
        if(users.size() == 1){
            if(users.get(0).getFavorite_sets().size() == 0 || users.get(0).getCreated_sets().size() == 0) { throw new ResourceNotFoundException(); }
            if(users.get(0).getFavorite_sets().get(0).getCards().size() == 0 || users.get(0).getCreated_sets().get(0).getCards().size() == 0) { throw new InvalideRequestException(""); }
        }

        for(User u : users) {

            // if users have no created or favorite sets skip them or either set has no cards (next 11 lines)
            ///////////////////////////////////////////////////////////////////////////////////////
            if(u.getFavorite_sets().size() == 0 || u.getCreated_sets().size() == 0) { continue; }
            if(invalidateCardCheck(u.getCreated_sets())) { continue; }
            if(invalidateCardCheck( u.getFavorite_sets())) { continue; }
            /////////////////////////////////////////////////////////////////////////////////////////

            /*
                 * iterating thought users created sets
                 * searching for the created user set that matched the updated_set id
                 * replacing target sets card array with the updated one
            */

            for (User.UserSetDoc set : u.getCreated_sets()) {
                if (set.getId().equals(updated_set.getId())) {
                    set.setCards(updated_set.getCards());
                }
            }

            /*
             * iterating thought users created sets
             * searching for the favorited user set that matched the updated_set id
             * replacing target sets card array with the updated one
             */
            for (User.UserSetDoc set : u.getFavorite_sets()) {
                if (set.getId().equals(updated_set.getId())) {
                    set.setCards(updated_set.getCards());
                }
            }

            userTable.putItem(u);
        }
    }

    /**
     * searches Sets list for an empty card list and returns true if empty list is found
     * @param in_list the set in witch to check (must be of type User.UserSetDoc)
     * @return
     * @Author Alfonso
     */
    boolean invalidateCardCheck(List<User.UserSetDoc> in_list)
    {
        for (User.UserSetDoc set : in_list) {
            if (set.getCards().size() == 0 ) {
                return true;
            }
        }
        return false;
    }
}