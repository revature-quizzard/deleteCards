package com.revature.delete_card.Documents;


import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

@Data
@DynamoDbBean
public class Tag {

    private String tagName;
    private String color;

    @DynamoDbPartitionKey
    public String getName() {
        return tagName;
    }

    public void setName(String name) {
        this.tagName = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Tag(String name){
        this.tagName = name;
    }

    public Tag() {
        super();
    }

}
