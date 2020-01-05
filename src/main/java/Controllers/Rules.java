package Controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.ws.rs.core.MediaType;
//creates handler and relevant paths
@Path("Rules/")
public class Rules {
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String listRules(){
        //logs that the operation is being run
        System.out.println("rules/list");
        JSONArray list = new JSONArray();
        try{
            //defines the SQL statement to be used to increase security
            PreparedStatement ps = Server.Main.db.prepareStatement("SELECT * FROM Rules"); /*(WHERE ...)*/
            ResultSet results = ps.executeQuery();
            //reads from database and add value  to list
            while (results.next()){
                JSONObject item = new JSONObject();
                item.put("RuleID", results.getInt(1));
                item.put("PenaltyMessage", results.getString(2));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception){
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
            //reports error if unable to complete
        }
    }
}
