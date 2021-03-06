package Controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.ws.rs.core.MediaType;
@Path("Card/")
public class Card {
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String selectCard(){
        try{
            System.out.println("card/list");
            JSONArray list = new JSONArray();
            PreparedStatement ps = Server.Main.db.prepareStatement("SELECT * FROM Cards"); /*(WHERE ...)*/
            ResultSet results = ps.executeQuery();
            while (results.next()){
                JSONObject item = new JSONObject();
                item.put("cardID", results.getInt(1));
                item.put("cardValue", results.getString(2));
                item.put("suit", results.getString(3));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception){
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
        }
    }
}
