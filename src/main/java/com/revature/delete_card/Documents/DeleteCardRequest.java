package com.revature.delete_card.Documents;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DeleteCardRequest {
    //card id
    private String cID;
    //set id
    private String seID;

    public String getcID() {
        return cID;
    }

    public void setcID(String cID) {
        this.cID = cID;
    }

    public String getSeID() {
        return seID;
    }

    public void setSeID(String seID) {
        this.seID = seID;
    }
}
