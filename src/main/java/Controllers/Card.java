package Controllers;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
/*@Path("Card/")*/
public class Card {
    public static void selectPlayer(){
        try{
            PreparedStatement ps = Server.Main.db.prepareStatement("SELECT * FROM Cardss"); /*(WHERE ...)*/
            ResultSet results = ps.executeQuery();
            while (results.next()){
                int cardID = results.getInt(1);
                String cardValue = results.getString(2);
                int suit = results.getInt(3);
            }
        } catch (Exception exception){
            System.out.println("Error: "+ exception.getMessage());
        }
    }
}
