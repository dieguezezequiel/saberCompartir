package com.sabercompartir.domain;

/**
 * Created by fede on 29/10/16.
 */
public class ResponseFront {
    private String title;
    private String text;
    private String type;

    public ResponseFront(String title, String text, String type) {
        this.title = title;
        this.text = text;
        this.type = type;
    }

    public ResponseFront(String text, String type) {
        this.text = text;
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public static ResponseFront success(String message){
        return new ResponseFront(message,"success");
    }
    public static ResponseFront success(String title, String message){
        return new ResponseFront(title,message,"success");
    }

    public static ResponseFront error(String message){
        return new ResponseFront(message,"error");
    }
    public static ResponseFront error(String title, String message){
        return new ResponseFront(title,message,"error");
    }

    public static ResponseFront notice(String message){
        return new ResponseFront(message,"notice");
    }
    public static ResponseFront notice(String title, String message){
        return new ResponseFront(title,message,"notice");
    }
}
