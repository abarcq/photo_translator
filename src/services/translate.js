import axios from 'axios';
import { get } from 'lodash';

import { KEY } from './constante';

export default async function translate(text, local) {
    const response = await axios.get(`https://translation.googleapis.com/language/translate/v2/?q=${text}&source=${local}&target=fr&key=${KEY}`)
    const textTranslated = get(response, 'data.data.translations[0].translatedText', 'error translated');
    return (textTranslated);
}