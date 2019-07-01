import java.sql.Connection;
import java.sql.DriverManager;
import org.sqlite.SQLiteConfig;
public class Main {

        public static Connection db = null;

        public static void main(String[] args) {
            PlayerController.openDatabase("Main.db");
        // code to get data from, write to the database etc goes here
          //  insert(0,1);
         //   insert(0,2);
            PlayerController.closeDatabase();
        }

        public static void openDatabase(String dbFile) {
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

        public static void closeDatabase(){
            try {
                db.close();
                //closes database file
                System.out.println("Disconnected from database.");
            } catch (Exception exception) {
                //catches errors & prints message rather then closing program
                System.out.println("Database disconnection error: " + exception.getMessage());
            }
        }
}}