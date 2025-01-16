import http from 'k6/http';
import { sleep, check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em até 2s
        http_req_failed: ['rate<0.01'],    // No máximo 1% das requisições podem falhar
    },
};

export default function () {
    const url = 'http://localhost:3333/signup';

    const payload = JSON.stringify({
        email: `${uuidv4().substring(24)}@qatester.com`,
        password: 'pwd123',
    });

    const headers = {
        'Content-Type': 'application/json', // Corrigido: os headers estavam mal configurados
    };

    const res = http.post(url, payload, { headers }); // Corrigido: forma correta de passar os headers

    console.log(res.body);

    check(res, {
        'status should be 201': (r) => r.status === 201,
    });

    sleep(1);
}
