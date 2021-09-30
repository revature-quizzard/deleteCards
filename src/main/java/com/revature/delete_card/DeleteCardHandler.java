package com.revature.delete_card;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.revature.delete_card.Documents.DeleteCardRequest;
import com.revature.delete_card.Documents.Set;
import com.revature.delete_card.Execptions.InvalideRequestException;
import com.revature.delete_card.Execptions.ResourceNotFoundException;
import com.revature.delete_card.Repositories.SetRepository;
import com.revature.delete_card.Repositories.UserRepository;

import java.util.List;

public class DeleteCardHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

private final SetRepository setRepo;
private final UserRepository userRepo;
private static final Gson mapper = new GsonBuilder().setPrettyPrinting().create();

public DeleteCardHandler() {
        this.setRepo = new SetRepository();
        this.userRepo = new UserRepository();
        }

public DeleteCardHandler(SetRepository setRepo, UserRepository userRepo) {
        this.setRepo = setRepo;
        this.userRepo = userRepo;
        }

/**
 * Handles a DELETE request to the /sets/id endpoint
 * @Authors Alfonso Holmes
 * @param requestEvent
 * @param context
 * @return
 */
@Override
public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {

        LambdaLogger logger = context.getLogger();


        APIGatewayProxyResponseEvent responseEvent = new APIGatewayProxyResponseEvent();

        //getting id out of request body
        String target_id = requestEvent.getQueryStringParameters().get("seID");
        String card_id = requestEvent.getQueryStringParameters().get("cID");

        DeleteCardRequest delCR = mapper.fromJson(requestEvent.getBody() , DeleteCardRequest.class);
        try{
        // deleting card from Sets table
        Set updated_set = setRepo.deleteCardBySetId(target_id , card_id);
        System.out.println("UPDATED SET : " + updated_set + "\n");
        // using updated set from table to update the rest of users
        userRepo.updateUserCollections(updated_set);
        responseEvent.setBody(mapper.toJson(updated_set));
        responseEvent.setStatusCode(200);
        }catch (ResourceNotFoundException rnfe) {
        responseEvent.setStatusCode(404);
        }catch (InvalideRequestException ire){
         responseEvent.setStatusCode(403);
        }catch (Exception e) {
        logger.log("///////////////////////////////////// L A M B D A LOGGER MESSAGE ////////////////////////////////////////// \n");
        logger.log("RECEIVED ERROR MESSAGE: " + e.getMessage() + "\n");
        responseEvent.setStatusCode(500);
        }

        logger.log("RECEIVED EVENT: " + responseEvent.getBody() + "\n" );
        logger.log("///////////////////////////////////// L A M B D A LOGGER MESSAGE ////////////////////////////////////////// \n");
        return responseEvent;
        }
}
