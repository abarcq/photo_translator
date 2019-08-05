import axios from 'axios';
import { get } from 'lodash';

import { KEY } from './constante';

export default async function contentVision(content) {
    const response = await axios.post(`https://content-vision.googleapis.com/v1/images:annotate?alt=json&key=${KEY}`, {
        requests: [{
            features: [{ type: "TEXT_DETECTION" }],
            image: { content }
        }]
    })

    const local = get(response, 'data.responses[0].textAnnotations[0].locale', 'ja')
    let text = get(response, 'data.responses[0].textAnnotations[0].description', 'error')
    text = text.replace(/( )(\n)(\r)/gi, '%20')
    text = text.replace(/#/gi, '')
    return ({ local, text });

}

export const fetchContent = async (content) => {
      try {
        const { data } = await axios.request({
          method: 'post',
          url: `https://content-vision.googleapis.com/v1/images:annotate?alt=json&key=${KEY}`,
          bady: {
            requests: [{
                features: [{ type: "TEXT_DETECTION" }],
                image: { content }
            }]
        }
        });
    
        return data;
      } catch (e) {
        console.error('Could not fetchData', e);
      }
    };