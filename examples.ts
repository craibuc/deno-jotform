import { load } from "https://deno.land/std@0.222.1/dotenv/mod.ts";
const env = await load();

import { Jotform } from "./mod.ts";

const jotform = new Jotform(env.JOTFORM_SUBDOMAIN,env.JOTFORM_API_KEY);

const form_id = '230178025881052'
const submission_id = '5890279022115066135'

const form_files = await jotform.get_form_files(form_id)
console.log(form_files)

const form_submissions = await jotform.get_form_submissions(form_id)
console.log(form_submissions)

const submission = await jotform.get_submission(submission_id)
console.log(submission)

const url = `https://subdomain.jotform.com/uploads/subdomain_teams/${form_id}/${submission_id}/lorem_ipsum.xyz`
const file_name = url.split('/').pop()

const file = await jotform.get_file(url)
Deno.writeFile(`./${file_name}`, file);