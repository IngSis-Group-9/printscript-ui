import {SnippetOperations} from "./snippetOperations.ts";
import {TestCase} from "../types/TestCase.ts";
import {TestCaseResult} from "./queries.tsx";
import {FileType} from "../types/FileType.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from './snippet'
import axios from 'axios';
import {PaginatedUsers} from "./users.ts";
import {Rule} from "../types/Rule.ts";

const CODE_PROCESSING_API_URL = 'http://localhost:8081';
const SNIPPET_MANAGER_API_URL = 'http://localhost:8083';

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
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/snippets/getAll`, {
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
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/snippets/create`, createSnippet);
        return response.data;
    },

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/snippets/${id}`);
        return response.data;
    },

    async updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        const response = await axiosInstance.put(`${SNIPPET_MANAGER_API_URL}/snippets/${id}`, updateSnippet);
        return response.data;
    },

    async getUserFriends(name?: string, page?: number, pageSize?: number, userId?: string): Promise<PaginatedUsers> {
        // ver como usar el page y el pageSize
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/user/friends`, { params: { name, page, pageSize, userId } });
        const aux: PaginatedUsers = {
            page: page!,
            page_size: pageSize!,
            count: 20,
            users: response.data,
        }
        return aux;
    },

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/snippets/${snippetId}/share`, { userId });
        return response.data;
    },

    async getFormatRules(): Promise<Rule[]> {
        const response = await axiosInstance.get(`${CODE_PROCESSING_API_URL}/formatRules`);
        return response.data;
    },

    async modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await axiosInstance.post(`${CODE_PROCESSING_API_URL}/formatRules`, newRules);
        return response.data;
    },

    async getLintingRules(): Promise<Rule[]> {
        const response = await axiosInstance.get(`${CODE_PROCESSING_API_URL}/lintingRules`);
        return response.data;
    },

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await axiosInstance.post(`${CODE_PROCESSING_API_URL}/lintingRules`, newRules);
        return response.data;
    },

    async getTestCases(snippetId: string): Promise<TestCase[]> {
        const response = await axiosInstance.get(`${SNIPPET_MANAGER_API_URL}/testCases`, { params: { snippetId } });
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
        const response = await axiosInstance.post(`${CODE_PROCESSING_API_URL}/formatSnippet`, { content: snippet });
        return response.data;
    },

    async postTestCase(testCase: Partial<TestCase>, snippetId: string): Promise<TestCase> {
        const response = await axiosInstance.post(`${SNIPPET_MANAGER_API_URL}/testCases/create`,
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
        const response = await axiosInstance.delete(`${SNIPPET_MANAGER_API_URL}/testCases/${id}`);
        return response.data;
    },

    async deleteSnippet(id: string): Promise<string> {
        const response = await axiosInstance.delete(`${SNIPPET_MANAGER_API_URL}/snippets/${id}`);
        return response.data;
    },

    async testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        const response = await axiosInstance.post(`${CODE_PROCESSING_API_URL}/testSnippet`, testCase);
        return response.data;
    },

    // Get supported languages
    async getFileTypes(): Promise<FileType[]> {
        const response = await axiosInstance.get(`${CODE_PROCESSING_API_URL}/fileTypes/getTypes`);
        return response.data;
    }
}
