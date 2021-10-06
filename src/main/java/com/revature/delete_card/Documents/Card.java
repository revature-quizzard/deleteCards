package com.revature.delete_card.Documents;

import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

@Data
@DynamoDbBean
public class Card {
    private String id;
    private String setId;
    private String question;
    private String answer;

    @DynamoDbPartitionKey
    public String getId() {
        return id;
    }

    public String getSetId() {
        return setId;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }
}
