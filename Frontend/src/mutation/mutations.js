
import { gql } from 'apollo-boost';

const signupMutation = gql`
    mutation Signup($name: String, $email: String, $password: String, $phone:String, $role: String, $zipcode: String, $owner_name: String, $rest_cuisine:String){
        signup(name: $name, email: $email, password: $password, phone: $phone, zipcode: $zipcode, role:$role, owner_name:$owner_name, rest_cuisine:$rest_cuisine){
            name
        }
    }
`;
const loginMutation = gql`
    mutation Login($email: String, $password: String, $role:String){
        login(email: $email, password: $password, role:$role){
            name
        }
    }
`;
const updateCustMutation = gql`
mutation UpdateProfileCust($name: String, $email: String, $password: String, $phone:String, $address: String, $oldEmail: String, $zipcode: String){
    updateCust(name: $name, email: $email, password: $password, phone: $phone, zipcode: $zipcode, address:$address, oldEmail:$oldEmail){
        name
    }
}
`;
const updateRestMutation = gql`
mutation UpdateProfileRest($name: String, $email: String, $password: String, $phone:String, $address: String, $oldEmail: String, $zipcode: String, $owner_name: String, $rest_cuisine:String){
    updateRest(name: $name, email: $email, password: $password, phone: $phone, zipcode: $zipcode, address:$address, oldEmail:$oldEmail, owner_name: $owner_name, rest_cuisine:$rest_cuisine){
        name
    }
}
`;
const addItemMutation = gql`
mutation AddItem($name: String, $email: String, $password: String, $phone:String, $address: String, $oldEmail: String, $zipcode: String, $owner_name: String, $rest_cuisine:String){
    addToMenu(name: $name, email: $email, password: $password, phone: $phone, zipcode: $zipcode, address:$address, oldEmail:$oldEmail, owner_name: $owner_name, rest_cuisine:$rest_cuisine){
        name
    }
}
`;
const getMenuMutation = gql`
mutation MenuRest($rest_email: String){
    getMenu(rest_email: $rest_email){
        item_name,
        rest_email,
        rest_cuisine,
        item_price,
        item_section,
        item_description,
        rest_name,
    }
}
`;
const getMenuByCustMutation = gql`
mutation BrowseRest($rest_email: String){
    getMenuByCust(rest_email: $rest_email){
        item_name,
        rest_email,
        rest_cuisine,
        item_price,
        item_section,
        item_description,
        rest_name,
    }
}
`;

export {signupMutation, loginMutation, updateCustMutation, updateRestMutation, addItemMutation, getMenuMutation, getMenuByCustMutation};