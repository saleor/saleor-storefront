import { Tile } from "@components/atoms";
import React from "react";
import "./css/styles.scss";
import * as S from "./styles";

export const InforProfile = () => {
    return(
        <div>
            <Tile>
                <S.Layout>
                <div style={{flex: 1}}>
                    <S.Header>
                        Personal Information
                    </S.Header>
                    <p>
                        <a href="#" className="linkInforProfile">
                            My Profile
                        </a>
                    </p>
                    
                    <p>
                        <a href="#" className="linkInforProfile">
                            Member Profile
                        </a>
                    </p>
                   
                    <p>
                        <a href="#" className="linkInforProfile">
                            Upload My Photo
                        </a>
                    </p>
                    
                    <p>
                        <a href="#" className="linkInforProfile">
                            Privacy Setting
                        </a>
                    </p>
                    
                    <p>
                        <a href="#" className="linkInforProfile">
                            Email Services
                        </a>
                    </p>
                </div>
                <div style={{flex: 1}}>
                    <S.Header>
                        Account Security
                    </S.Header>
                    <p>
                        <a href="#" className="linkInforProfile">
                            Change Email Address
                        </a>
                    </p>
                    
                    <p>
                        <a href="#" className="linkInforProfile">
                            Change Password
                        </a>
                    </p>
                    
                    <p>
                        <a href="#" className="linkInforProfile">
                            Set Security Question
                        </a>
                    </p>
                   
                    <p>
                        <a href="#" className="linkInforProfile">
                            Manage Verification Phones
                        </a>
                    </p>
                    
                    <p>
                        <a href="#" className="linkInforProfile">
                            Manage My Connected Accounts
                        </a>
                    </p>
                </div>
                <div style={{flex: 1}}>
                    <S.Header>
                        Finance Account
                    </S.Header>
                    <p>
                        <a href="#" className="linkInforProfile">
                            My Transactions Center
                        </a>
                    </p>
                </div>
                </S.Layout>
                
            </Tile>
        </div>
    )
}