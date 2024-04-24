export class Jotform {

    private subdomain: string;
    private api_key: string;

    constructor (subdomain: string, api_key: string) {
        this.subdomain = subdomain
        this.api_key = api_key
    }

    get_file = async (
        url: string,
      ) => {
      
        return await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            APIKEY: this.api_key,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`${response.statusText} [${response.status}]`);
            }
            return response.arrayBuffer();
          })
          .then((buffer) => {
            return new Uint8Array(buffer);
          });
    
    }
    
    get_form_files = async (
        form_id: string,
      ) => {
      
        const url = `https://${this.subdomain}.jotform.com/API/form/${form_id}/files`;
        // console.log('url', url);
      
        return await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            APIKEY: this.api_key,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`${response.statusText} [${response.status}]`);
            }
            return response.json();
          })
          .then((data) => data.content);
      
    }
      
    get_form_submissions = async (
        form_id: string
      ) => {
      
        const url = `https://${this.subdomain}.jotform.com/API/form/${form_id}/submissions`;
        // console.log('url', url);
      
        return await fetch(url, {
          headers: {
            Accept: "application/json",
            APIKEY: this.api_key
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.statusText} [${response.status}]`);
          }
          return response.json();
        })
        .then((data)=> data.content);
      
    }
      
    get_submission = async (
        submission_id: string
      ) => {
      
        const url = `https://${this.subdomain}.jotform.com/API/submission/${submission_id}`;
        // console.log('url',url)
    
        return await fetch(url, {
          headers: {
            Accept: "application/json",
            APIKEY: this.api_key
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.statusText} [${response.status}]`);
          }
          return response.json();
        })
        .then((data)=> data.content);
    
    }

}