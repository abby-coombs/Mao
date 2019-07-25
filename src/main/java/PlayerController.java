import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class PlayerController{
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
    public static void selectPlayer(){
        try{
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Players"); /*(WHERE ...)*/
            ResultSet results = ps.executeQuery();
            while (results.next()){
                int playerID = results.getInt(1);
                String playerName = results.getString(2);
                int winCount = results.getInt(3);
            }
        } catch (Exception exception){
            System.out.println("Error: "+ exception.getMessage());
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
