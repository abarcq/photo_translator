import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import TranslateImage from '../src/components/Camera';
import { TEST_IMAGE, TEST_RESPONSE_CONTENT, TEST_RESPONSE_TRANSLATE, TEST_TEXT } from '../src/services/constante'
import { fetchContent } from '../src/services/ContentVision';
import { fetchTranslate } from '../src/services/Translate';


// Note: test renderer must be required after react-native.

it('renders correctly', () => {
    const tree = renderer.create(
        <TranslateImage />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('should call content vision google api', done => {
    fetchContent(TEST_IMAGE).then(response => {
        expect(response).toEqual(TEST_RESPONSE_CONTENT);
    });
    done();
});

it('should call translate api', done => {
    fetchTranslate(TEST_TEXT).then(response => {
        expect(response).toEqual(TEST_RESPONSE_TRANSLATE);
    });
    done();
});