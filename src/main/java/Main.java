import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import org.sqlite.SQLiteConfig;
public class Main {

        public static Connection db = null;

        public static void main(String[] args) {
            openDatabase("Users.db");
        // code to get data from, write to the database etc goes here
            insert(0,1);
            insert(0,2);
            closeDatabase();
        }

        private static void openDatabase(String dbFile) {
            try  {
                Class.forName("org.sqlite.JDBC");
                //loads the database driver
                SQLiteConfig config = new SQLiteConfig();
                config.enforceForeignKeys(true);
                //establishes database settings (maintains structural integrity)
                db = DriverManager.getConnection("jdbc:sqlite:resources/" + dbFile, config.toProperties());
               //opens datavase file
                System.out.println("Database connection successfully established.");
            } catch (Exception exception) {
                //catches errors & prints message rather then closing program
                System.out.println("Database connection error: " + exception.getMessage());
            }

        }

        public static void insert( int winCount, int handID) {
            try {
                PreparedStatement ps = db.prepareStatement("INSERT INTO Users (WinCount, HandID) VALUES (?,?)");
                ps.setInt(1,winCount);
                ps.setInt(2,handID);
                ps.executeUpdate();
                System.out.println();
            } catch (Exception exception) {
                System.out.println("Error: "+ exception.getMessage());
            }
        }
        public static void delete(){
            try{
                PreparedStatement ps = db.prepareStatement("DELETE FROM Users WHERE WinCount = ?");
                ps.setInt(1,1);
                ps.executeUpdate();
            }catch (Exception exception) {

            }
        }
        public static void select(){

        }
        public static void update(){

        }

        private static void closeDatabase(){
            try {
                db.close();
                //closes database file
                System.out.println("Disconnected from database.");
            } catch (Exception exception) {
                //catches errors & prints message rather then closing program
                System.out.println("Database disconnection error: " + exception.getMessage());
            }
        }
}