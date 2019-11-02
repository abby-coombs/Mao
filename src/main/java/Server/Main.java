package Server;

import java.sql.Connection;
import java.sql.DriverManager;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;
import org.sqlite.SQLiteConfig;

public class Main {

        public static Connection db = null;

        public static void main(String[] args) {
            openDatabase("Users.db");
            ResourceConfig config = new ResourceConfig();
            config.packages("Controllers");
            config.register(MultiPartFeature.class);
            ServletHolder servlet = new ServletHolder(new ServletContainer(config));

            Server server = new Server(8081);
            ServletContextHandler context = new ServletContextHandler(server, "/");
            context.addServlet(servlet, "/*");

            try {
                server.start();
                System.out.println("Server successfully started.");
                server.join();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

        public static void openDatabase(String dbFile) {
            try  {
                Class.forName("org.sqlite.JDBC");
                //loads the database driver
                SQLiteConfig config = new SQLiteConfig();
                config.enforceForeignKeys(true);
                //establishes database settings (maintains structural integrity)
                db = DriverManager.getConnection("jdbc:sqlite:resources/" + dbFile, config.toProperties());
                //opens database file
                System.out.println("Database connection successfully established.");
            } catch (Exception exception) {
                //catches errors & prints message rather then closing program
                System.out.println("Database connection error: " + exception.getMessage());
            }

        /*public static void closeDatabase(){
            try {
                db.close();
                //closes database file
                System.out.println("Disconnected from database.");
            } catch (Exception exception) {
                //catches errors & prints message rather then closing program
                System.out.println("Database disconnection error: " + exception.getMessage());
            } */
        }
}