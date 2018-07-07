/* 
 * Copyright 2018 michael.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


package AlgoREPL;

import java.io.File;
import java.io.FileWriter;
import javax.websocket.OnMessage;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException; 
import java.net.URLDecoder;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import org.apache.tomcat.jni.Error;
//import org.apache.tomcat.jni.File;

/**
 *
 * @author michael
 */
@ServerEndpoint("/compile")
public class Compile {

    private long fileDescr;
    private File sourceFile;
    
    @OnOpen
    public void onOpen(Session session){
        System.out.println(session.getId() + " has opened a connection"); 
        try {
            session.getBasicRemote().sendText("Connection Established");
            createSource(URLDecoder.decode(session.getQueryString(),"UTF-8"));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
 
    /**
     * When a user sends a message to the server, this method will intercept the message
     * and allow us to react to it. For now the message is read as a String.
     */
    @OnMessage
    public void onMessage(String message, Session session){
        System.out.println("Message from " + session.getId() + ": " + message);
        try {
            session.getBasicRemote().sendText("ECHO : " + message);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
 
    /**
     * The user closes the connection.
     * 
     * Note: you can't send messages to the client from this method
     */
    @OnClose
    public void onClose(Session session){
        deleteSource();
        System.out.println("Session " +session.getId()+" has ended");
    }
    
    
    private void createSource(String source) {
        try {
            String hash = Integer.toString(this.hashCode());
            
            // Create file
            sourceFile = File.createTempFile("webCompile",".cpp");
            System.out.println("Created file " + sourceFile.getAbsolutePath());
            sourceFile.deleteOnExit();
            
            // Save source
            FileWriter fileWriter = new FileWriter(sourceFile);
            fileWriter.write(source);
            fileWriter.flush();
            
            // Compile
        } catch (IOException ex) {
            Logger.getLogger(Compile.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void deleteSource() {
        String hash = Integer.toString(this.hashCode());
        sourceFile.delete();
    }
    
}
