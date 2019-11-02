package Controllers;

import Server.Main;
import com.sun.jersey.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("Player/")
//creates handler
public class Player {
    @POST
    @Path("new")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String insertPlayer(@FormDataParam("Name") String Name, @FormDataParam("WinCount") Integer WinCount) {
        try {
            if (Name == null||WinCount == null){
                throw new Exception("One or more parameters missing in HTTP request.");
            }
            System.out.println("player/new Name =" + Name);
            PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Players (Players.Name, Players.WinCount) VALUES (?,?)");
            ps.setString(1, Name);
            ps.setInt(2,WinCount);
            ps.executeUpdate();
            System.out.println();
            return "{\"status\":\"OK\"}";
        } catch (Exception exception) {
            System.out.println("Error: "+ exception.getMessage());
            return "{\"error\":\"Unable to add player, see server info for more information\"}";
        }
    }
    @POST
    @Path("delete")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    //creates handler for /players/delete
    public String deletePlayer(@FormDataParam("Name") String Name){
        try{
            if (Name == null){
                throw new Exception("One or more parameters missing in HTTP request.");
            }
            //specifies parameters to pass into API method
            System.out.println("player/delete name=" + Name);
            PreparedStatement ps = Main.db.prepareStatement("DELETE FROM Players WHERE Players.Name = ?");
            ps.setString(1, Name);
            ps.executeUpdate();
            //deletes player from database
            return "{\"status\": \"OK\"}";
        }catch (Exception exception) {
            System.out.println("Error: "+ exception.getMessage());
            return "{\"error\":\"Unable to delete, see server console for more information\"}";
            //reports error if unable to complete update
        }
    }
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String  selectPlayer(){
        System.out.println("things/list");
        JSONArray list = new JSONArray();
        try{
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Players"); /*(WHERE ...)*/
            ResultSet results = ps.executeQuery();
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
        }
    }
    @POST
    @Path("update")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    //creates handler for /players/update
    public String updatePlayer(@FormDataParam("playerName") String playerName, @FormDataParam("playerID") Integer playerID){
       //specifies parameters to pass into API method
        try {
            if(playerName == null || playerID == null) {
                throw new Exception("One or more parameters missing in HTTP request.");
            }
            //ensures the request will not  fail due to empty parameters
            System.out.println("player/update name=" + playerName);
            PreparedStatement ps = Main.db.prepareStatement("UPDATE Players SET Players.Name = ? WHERE Players.PlayerID = ?");
            ps.setString(1, playerName);
            ps.setInt(2, playerID);
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
