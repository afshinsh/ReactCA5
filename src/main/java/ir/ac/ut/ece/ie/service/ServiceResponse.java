package ir.ac.ut.ece.ie.service;

public class ServiceResponse {
    public ServiceResponse(Object data, boolean success, String statusCode, String message){
        Data = data;
        Success = success;
        StatusCode = statusCode;
        Message = message;
    }
    public Object Data;
    public boolean Success = true;
    public String StatusCode = "200";
    public String Message;
}
