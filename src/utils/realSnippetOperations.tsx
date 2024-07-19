import {SnippetOperations} from "./snippetOperations.ts";
import {TestCase} from "../types/TestCase.ts";
import {TestCaseResult} from "./queries.tsx";
import {FileType} from "../types/FileType.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from './snippet'
import axios from 'axios';
import {PaginatedUsers} from "./users.ts";
import {Rule} from "../types/Rule.ts";

const SNIPPET_MANAGER_API_URL = 'https://nueve-de-diciembre-dev.duckdns.org';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authAccessToken');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const RealSnippetOperations: SnippetOperations = {

    async listSnippetDescriptors(page: number, pageSize: number, snippetName: string): Promise<PaginatedSnippets> {
        // ver como usar el page y el pageSize
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/snippet-manager/snippets/getAll`, {
            params: { page, pageSize, snippetName }
        });
        const aux: PaginatedSnippets = {
            page: page,
            page_size: pageSize,
            count: 20,
            snippets: response.data
        }
        return aux;
    },

    async createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/snippet-manager/snippets/create`, createSnippet);
        return response.data;
    },

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/snippet-manager/snippets/${id}`);
        return response.data;
    },

    async updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        const response = await axiosInstance.put(`${SNIPPET_MANAGER_API_URL}/snippet-manager/snippets/${id}`, updateSnippet);
        return response.data;
    },

    async getUserFriends(name?: string, page?: number, pageSize?: number, userId?: string): Promise<PaginatedUsers> {
        // ver como usar el page y el pageSize
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/snippet-manager/user/friends`, { params: { name, page, pageSize, userId } });
        const aux: PaginatedUsers = {
            page: page!,
            page_size: pageSize!,
            count: 20,
            users: response.data,
        }
        return aux;
    },

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/snippet-manager/snippets/${snippetId}/share`, { userId });
        return response.data;
    },

    async getFormatRules(): Promise<Rule[]> {
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/snippet-manager/formatRules`);
        return response.data;
    },

    async modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/snippet-manager/formatRules`, newRules);
        return response.data;
    },

    async getLintingRules(): Promise<Rule[]> {
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/snippet-manager/lintingRules`);
        return response.data;
    },

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/snippet-manager/lintingRules`, newRules);
        return response.data;
    },

    async getTestCases(snippetId: string): Promise<TestCase[]> {
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/snippet-manager/testCases`, { params: { snippetId } });
        return response.data.map((testCase: TestCase) => {
            return {
                id: testCase.id,
                name: testCase.name,
                input: testCase.input,
                output: testCase.output,
                envVars: testCase.envVars
            }
        })
    },

    async formatSnippet(snippet: string): Promise<string> {
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/snippet-manager/formatSnippet`, { content: snippet });
        return response.data;
    },

    async postTestCase(testCase: Partial<TestCase>, snippetId: string): Promise<TestCase> {
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/snippet-manager/testCases/create`,
     {
            name: testCase.name,
            input: testCase.input,
            output: testCase.output,
            envVars: testCase.envVars,
            snippetId: snippetId
          }
        );
        return response.data;
    },

    async removeTestCase(id: string): Promise<string> {
        const response = await axiosInstance.delete(`${SNIPPET_MANAGER_API_URL}/snippet-manager/testCases/${id}`);
        return response.data;
    },

    async deleteSnippet(id: string): Promise<string> {
        const response = await axiosInstance.delete(`${SNIPPET_MANAGER_API_URL}/snippet-manager/snippets/${id}`);
        return response.data;
    },

    async testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> { // me va a llegar un boolean como response, lo tengo que mapear a TestCaseResult
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/snippet-manager/testSnippet`, testCase);
        return response.data;
    },

    // Get supported languages
    async getFileTypes(): Promise<FileType[]> {
        // const response = await axiosInstance.get(`${CODE_PROCESSING_API_URL}/fileTypes/getTypes`);
        // return response.data;
        return [{language: 'printscript', extension: 'ps'}]
    }
}
