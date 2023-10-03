import { ComponentsProvider } from "@looker/components";
import { DataProvider } from "@looker/components-data";
import { Query, Visualization } from "@looker/visualizations";
import React, { useEffect, useState } from 'react';

import { Looker40SDK } from '@looker/sdk';
import {
  AuthToken,
  AuthSession,
  BrowserTransport,
  DefaultSettings,
} from '@looker/sdk-rtl'
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class SDKSession extends AuthSession {
  // This is a placeholder for the fetchToken function.
  // It is modified to make it useful later.
  async fetchToken() {
    return fetch('')
  }

  activeToken = new AuthToken()
  constructor(settings: any, transport?: any) {
    super(settings, transport || new BrowserTransport(settings))
  }

  // This function checks to see if the user is already authenticated
  isAuthenticated() {
    const token = this.activeToken
    if (!(token && token.access_token)) return false
    return token.isActive()
  }

  // This function gets the current token or fetches a new one if necessary
  async getToken() {
    if (!this.isAuthenticated()) {
      type ResponseType = {
        access_token: string;
      }

      // const response = (await this.fetchToken());
      // console.log("Access token: ");
      // console.log(response);
      // const token = await response.access_token;
      this.activeToken.setToken({ access_token: 'xBJ5ChYckz6Pc9hkVkcVkS7c4PpVQS5JBbgyVyB8' });
    }
    return this.activeToken
  }

  // This function authenticates a user, which involves getting a new token
  // It returns a modified object with a new authorization header.
  async authenticate(props: any) {
    const token = await this.getToken()
    if (token && token.access_token) {
      props.mode = 'cors'
      delete props.credentials
      props.headers = {
        ...props.headers,
        Authorization: `Bearer ${this.activeToken.access_token}`,
      }
    }
    return props
  }
}

// This class sets the fetchToken to use the 'real' address of the backend server.
class SDKSessionEmbed extends SDKSession {
  // fetchToken() {
  //   // return axios('http://127.0.0.1:8000/get_access_token', {
  //   //   method: 'get'
  //   // })
  //   return fetch('http://127.0.0.1:8000/get_access_token', { method: 'GET', mode: 'cors' });
  // }
}

// This creates a new session with the 'real' address used above
const session = new SDKSessionEmbed({
  ...DefaultSettings,
  base_url: 'https://b4f0dee3-e2fc-4805-bf3a-238887592df4.looker.app',
})

// This exports the SDK with the authenticated session
export const sdk = new Looker40SDK(session)




const CustomChart2 = ({embedUrl}: {embedUrl: string}) => {
  const initialWidth = (Math.max((document.getElementsByTagName('body')[0].offsetWidth as number) - 100, 800)) + 'px';
  const [width, setWidth] = useState<string>(initialWidth);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
    console.log(body);
    body.onresize = () => {
      setWidth(() => (Math.max((body.offsetWidth as number) - 100, 800)) + 'px');
      console.log("Width: " + width);
    }
  }, []);


  return (<>


      <iframe
        src={embedUrl + '&allow_login_screen=true'}
        width={width}
        height="1200"
        frameBorder="0">
      </iframe>
    {/* <ComponentsProvider>
        <DataProvider sdk={sdk}>
          // Change this query slug to match your query slug
          <Query dashboard={4}>
            <Visualization />
          </Query>
        </DataProvider>
      </ComponentsProvider> */}
  </>);
}

export default CustomChart2;

