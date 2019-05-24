import React from 'react';
import Card from '../Card';

export interface IRemoveAccount {
}

const RemoveAccount: React.FC<IRemoveAccount> = () => (
    <Card header="Remove Account">
    <p>If you want to remove your account from our store please use the link you can find below</p>
    <br />
    <p className="u-link">Remove my account</p>
    </Card>
);

export default RemoveAccount