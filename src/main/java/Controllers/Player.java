package Controllers;

import Server.Main;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/*@Path("Player/")*/
public class Player {
    public static void insertPlayer(String Name, int WinCount) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Players (Players.Name, Players.WinCount) VALUES (?,?)");
            ps.setString(1, Name);
            ps.setInt(2,WinCount);
            ps.executeUpdate();
            System.out.println();
        } catch (Exception exception) {
            System.out.println("Error: "+ exception.getMessage());
        }
    }
    public static void deletePlayer(String Name){
        try{
            PreparedStatement ps = Main.db.prepareStatement("DELETE FROM Players WHERE Players.Name = ?");
            ps.setString(1, Name);
            ps.executeUpdate();
        }catch (Exception exception) {
            System.out.println("Error: "+ exception.getMessage());
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
    public static void updatePlayer(String playerName, int playerID){
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE Players SET Players.Name = ? WHERE Players.PlayerID = ?");
            ps.setString(1, playerName);
            ps.setInt(2, playerID);
            ps.executeUpdate();
        } catch (Exception exception) {
            System.out.println("Error: " + exception.getMessage());
        }

    }
}
