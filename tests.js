'use strict';

import V3Store from "/vee3/vee_store.js";

class Tests {
    constructor() {
        describe('unauthenticated api', function() {
            it('/ping', async() => {
                let data = await V3Store.$get('/ping');
                assert(data !== undefined, "/ping ran ok");
                assert(data.status === 'ok', "/ping status is ok");
                console.log(JSON.stringify(data))
            });

            it('/register/interest', async() => {
                let data = await V3Store.$post('/register/interest', { email: 'test@example.com', reason: 'I am testing your api' });
                assert(data !== undefined, "/register/interest ran ok");
                assert(data.msg === 'invalid instanceId', "/register/interest is 'invalid instanceId'");
            });

            /**
             * V3Store
             * LocalStorage
             */
            it('V3Store.$local_remove', async() => {
                let status1 = await V3Store.$local_remove('test_data');
                let status2 = await V3Store.$local_remove('test_name');
                assert(status1 === true, "V3Store.$local_remove ran ok");
                assert(status2 === true, "V3Store.$local_remove ran ok");
            });

            it('V3Store.$local_set', async() => {
                let status_obj = await V3Store.$local_set('test_data', { email: 'test@example.com', reason: 'I am testing your api' });
                assert(status_obj === true, "V3Store.$local_set ran ok");
                let status_json = await V3Store.$local_set('test_name', JSON.stringify({ name: 'Dave Lister' }));
                assert(status_json === true, "V3Store.$local_set ran ok");
            });

            it('V3Store.$local_get', async() => {
                let data1 = await V3Store.$local_get('test_data');
                assert(data1 !== undefined, "V3Store.$local_get ran ok");
                assert(data1.email === 'test@example.com', "V3Store.$local_get email read ok");
                let data2 = await V3Store.$local_get('test_name');
                assert(data2 !== undefined, "V3Store.$local_get ran ok");
                assert(data2.name === 'Dave Lister', "V3Store.$local_get name read ok");
            });
        });
    }
}

export default Tests