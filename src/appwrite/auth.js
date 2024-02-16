import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
        .setProject(config.appwriteProjectId);
        this.account=new Account(this.client);
    }


    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name); 
            if(userAccount){
                //call another method as login
                return this.login({email,password});
            }else{
                return userAccount;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }
    async login({email,password}){
        try{
           return await this.account.createEmailSession(email,password); 
        }catch(error){
            console.log(error);
        }
    }

    async getCurrentUser(){
        try {
            return this.account.get();
        } catch (error) {
            console.log(error);
        }
        
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}


const authService=new AuthService();

export default authService;