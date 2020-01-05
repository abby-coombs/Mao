package Controllers;

import Server.Main;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

//establishes handler and relevant paths
@Path("Player")
public class Player {
    @POST
    @Path("new")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String insertPlayer(@org.glassfish.jersey.media.multipart.FormDataParam("Name") String Name, @org.glassfish.jersey.media.multipart.FormDataParam("WinCount") Integer WinCount, @org.glassfish.jersey.media.multipart.FormDataParam("PlayerID") Integer PlayerID) {
        //prevents errors from crashing it
        try {
            //checks for all required parameters
            if (Name == null|| WinCount == null || PlayerID == null){
                throw new Exception("One or more parameters missing in HTTP request.");
            }
            //logs that the operation is being run
            System.out.println("player/new Name = " + Name + ", ID = " + PlayerID + ", Wins = " + WinCount);
            //defines the SQL statement to be used to increase security
            PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Players (Name, WinCount, PlayerID) VALUES (?,?, ?)");
            //populates statement & executes it
            ps.setString(1, Name);
            ps.setInt(2,WinCount);
            ps.setInt(3, PlayerID);
            ps.executeUpdate();
            //System.out.println();
            //returns status of statement
            return "{\"status\":\"OK\"}";
            //deals with any exceptions
        } catch (Exception exception) {
            System.out.println("Error: "+ exception.getMessage());
            return "{\"error\":\"Unable to add player, see server info for more information\"}";
        }
    }
    //establishes handler and relevant paths
    @POST
    @Path("delete")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    //creates handler for /players/delete
    public String deletePlayer(@org.glassfish.jersey.media.multipart.FormDataParam("Name") String Name){
        //prevents errors from crashing it
        try{
            //checks for all required parameters
            if (Name == null){
                throw new Exception("One or more parameters missing in HTTP request.");
            }
            //logs that the operation is being run
            System.out.println("player/delete name=" + Name);
            //defines the SQL statement to be used to increase security
            PreparedStatement ps = Main.db.prepareStatement("DELETE FROM Players WHERE Players.Name = ?");
            //populates statement & executes it
            ps.setString(1, Name);
            ps.executeUpdate();
            //returns status of statement
            return "{\"status\": \"OK\"}";
            //deals with any exceptions
        }catch (Exception exception) {
            System.out.println("Error: "+ exception.getMessage());
            return "{\"error\":\"Unable to delete, see server console for more information\"}";
            //reports error if unable to complete update
        }
    }
    //establishes handler and relevant paths
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String  selectPlayer(){
        //logs that the operation is being run
        System.out.println("player/list");
        JSONArray list = new JSONArray();
        try{
            //defines the SQL statement to be used to increase security
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Players"); /*(WHERE ...)*/
            ResultSet results = ps.executeQuery();
            //reads from database and add value  to list
            while (results.next()){
                JSONObject item = new JSONObject();
                item.put("id",  results.getInt(1));
                item.put("name", results.getString(2));
                item.put("quantity", results.getInt(3));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception){
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
            //reports error if unable to complete
        }
    }
    //establishes handler and relevant paths
    @POST
    @Path("update/name")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    //creates handler for /players/update
    public String updatePlayer(@org.glassfish.jersey.media.multipart.FormDataParam("Name") String PlayerName, @org.glassfish.jersey.media.multipart.FormDataParam("PlayerID") Integer PlayerID){
       //specifies parameters to pass into API method
        try {
            //ensures the request will not  fail due to empty parameters
            if(PlayerName == null || PlayerID == null) {
                throw new Exception("One or more parameters missing in HTTP request.");
            }
            //logs that the operation is being run
            System.out.println("player/update name=" + PlayerName);
            PreparedStatement ps = Main.db.prepareStatement("UPDATE Players SET Name = ? WHERE PlayerID = ?");
            ps.setString(1, PlayerName);
            ps.setInt(2, PlayerID);
            ps.executeUpdate();
            //updates player details
            return "{\"status\": \"OK\"}";
        } catch (Exception exception) {
            System.out.println("Error: " + exception.getMessage());
            return "{\"error\":\"Unable to update, please see server console for more information}";
            //reports error if unable to complete update
        }

    }
    //establishes handler and relevant paths
    @POST
    @Path("update/wins")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    //creates handler for /players/update
    public String updatePlayer(@org.glassfish.jersey.media.multipart.FormDataParam("PlayerID") Integer PlayerID, @org.glassfish.jersey.media.multipart.FormDataParam("WinCount") Integer WinCount){
        //specifies parameters to pass into API method
        try {
            if(WinCount == null || PlayerID == null) {
                throw new Exception("One or more parameters missing in HTTP request.");
            }
            //ensures the request will not  fail due to empty parameters
            System.out.println("player/update name=" + WinCount);
            PreparedStatement ps = Main.db.prepareStatement("UPDATE Players SET WinCount = ? WHERE PlayerID = ?");
            ps.setInt(1, WinCount);
            ps.setInt(2, PlayerID);
            ps.executeUpdate();
            //updates player details
            return "{\"status\": \"OK\"}";
        } catch (Exception exception) {
            System.out.println("Error: " + exception.getMessage());
            return "{\"error\":\"Unable to update, please see server console for more information}";
            //reports error if unable to complete update
        }

    }
}
