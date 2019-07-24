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