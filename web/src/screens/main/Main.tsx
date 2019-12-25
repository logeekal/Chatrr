import React, { FunctionComponent } from "react";
import Layout from "../../component/Layout";
import Avatar from "../../component/avatar/Avatar";
import Menu from "../../component/menu/Menu";

const Main: FunctionComponent = props => {


  return (
    <div className="main-container">
      <Layout className="side">
        <Avatar 
          type="full"
          label="hellofaster"
          size={150}
          image="https://picsum.photos/200"
        />
        <Menu 
          menu={[
            {
              id: 'rooms',
              label: 'rooms'
            },
            {
              id: 'chats',
              label: 'chats'
            },
            {
              id: 'profile',
              label: 'profile'
            },
            {
              id: 'contactUs',
              label: 'contact us'
            },
            {
              id: 'settings',
              label: 'settings'
            },
            {
              id: 'signOut',
              label: 'sign out'
            }
          ]}
        />

        />
      </Layout>
      <Layout className="context">context Panel</Layout>
      <Layout className="main">Main Panel</Layout>
    </div>
  );
};

export default Main;


