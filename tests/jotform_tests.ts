import { assertEquals, assertExists, assert } from "https://deno.land/std@0.223.0/assert/mod.ts";
import { MockFetch } from "https://deno.land/x/deno_mock_fetch@0.1.1/mod.ts";

import { Jotform } from "../mod.ts";

const jotform = new Jotform('lorem','ipsum');

Deno.test("get_submission returns an object with a content node", async () => {

    // arrange
    const submission_id = '0123456789'

    const body = JSON.stringify({
        "content": {
            "id": submission_id,
            "status": "ACTIVE",
            "answers": {}
        },
        "message": "success",
        "responseCode": 200  
    })

    const mockFetch = new MockFetch();
    mockFetch
        .intercept(`https://lorem.jotform.com/API/submission/${submission_id}`, { method: "GET" })
        .reply(body, { status: 200 });

    // act      
    const submission = await jotform.get_submission(submission_id);

    // assert
    assertEquals(submission.id, submission_id);

});

Deno.test("get_form_submissions returns an object with a content node", async () => {

    // arrange
    const form_id = '12345678901234567890'

    const body = JSON.stringify({
        "content": [
            {
                "id": "5890279022115066135",
                "status": "ACTIVE",
                "answers": {},
                "form_id": "12345678901234567890",
            },
        ]
    })

    const mockFetch = new MockFetch();
    mockFetch
        .intercept(`https://lorem.jotform.com/API/form/${form_id}/submissions`, { method: "GET" })
        .reply(body, { status: 200 });

    // act      
    const submissions = await jotform.get_form_submissions(form_id);

    // assert
    assertEquals(submissions[0].form_id, form_id);

});

Deno.test("get_form_files returns an object with a content node", async () => {

    // arrange
    const form_id = '12345678901234567890'

    const body = JSON.stringify({
        "responseCode": 200,
        "message": "success",
        "content": [
            {
                "id": "1",
                "name": "lorem_ipsum.jpg",
                "form_id": form_id,
                "submission_id": "0",
                "url": "http://lorem.jotform.com/uploads/LoremIpsum/form_files/lorem_ipsum.jpg"
            },
        ]
    })

    const mockFetch = new MockFetch();
    mockFetch
        .intercept(`https://lorem.jotform.com/API/form/${form_id}/files`, { method: "GET" })
        .reply(body, { status: 200 });

    // act      
    const files = await jotform.get_form_files(form_id);

    // assert
    assertEquals(files[0].form_id, form_id);
    assertExists(files[0].url);

});

Deno.test("get_file returns an Uint8Array", async () => {

    // arrange
    const message = 'Hello, world!!'

    const encoder = new TextEncoder();
    const binaryData = encoder.encode(message);
    const arrayBuffer = binaryData.buffer;

    const url = `https://lorem.jotform.com/uploads/dummy/superman.jpg`

    const mockFetch = new MockFetch();
    mockFetch
        .intercept(url, { method: "GET" })
        .reply(arrayBuffer, { status: 200 });

    // act      
    const file_array = await jotform.get_file(url);

    // assert
    const decoder = new TextDecoder();
    const decodedText = decoder.decode(file_array);
    // Assert that the decoded text matches the original text
    assertEquals(decodedText, message);
    
    assert(file_array instanceof Uint8Array);

});
