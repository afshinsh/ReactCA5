package ir.ac.ut.ece.ie.Views;

public class LoginView {
    public LoginView(boolean _valid, String _message){
        valid = _valid;
        message = _message;
    }
    public boolean valid;
    public String message;


    public boolean getValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }
}
