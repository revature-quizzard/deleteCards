package com.revature.delete_card.Documents;

import lombok.Builder;
import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

@Data
@DynamoDbBean
public class Tag {

    private String tagName;
    private String tagColor;

    @DynamoDbPartitionKey
    public String getTagName() {
        return tagName;
    }

    public Tag(String name){
        this.tagName = name;
    }

    public Tag() {
        super();
    }
}
