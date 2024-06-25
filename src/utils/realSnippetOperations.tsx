import {SnippetOperations} from "./snippetOperations.ts";
import {TestCase} from "../types/TestCase.ts";
import {TestCaseResult} from "./queries.tsx";
import {FileType} from "../types/FileType.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from './snippet'
import axios from 'axios';
import {PaginatedUsers} from "./users.ts";
import {Rule} from "../types/Rule.ts";
// import {useAuth0} from "@auth0/auth0-react";

const CODE_PROCESSING_API_URL = 'http://localhost:8081';
const SNIPPET_MANAGER_API_URL = 'http://localhost:8083';

// const GetToken = async () => {
//     const { getAccessTokenSilently } = useAuth0();
//     return await getAccessTokenSilently();
// }

export const RealSnippetOperations: SnippetOperations = {

    async listSnippetDescriptors(page: number, pageSize: number, userId: string, sippetName?: string): Promise<PaginatedSnippets> {
        // ver como usar el page y el pageSize
        const response = await axios.get(`${SNIPPET_MANAGER_API_URL}/snippets/getAll`, { params: { page, pageSize, userId, sippetName } });
        const aux: PaginatedSnippets = {
            page: page,
            page_size: pageSize,
            count: 20,
            snippets: response.data
        }
        return aux;
    },

    async createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        const response = await axios.post(`${SNIPPET_MANAGER_API_URL}/snippets/create`, createSnippet);
        return response.data;
    },

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        const response = await axios.get(`${SNIPPET_MANAGER_API_URL}/snippets/${id}`);
        return response.data;
    },

    async updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        const response = await axios.put(`${SNIPPET_MANAGER_API_URL}/snippets/${id}`, updateSnippet);
        return response.data;
    },

    async getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        const response = await axios.get(`${SNIPPET_MANAGER_API_URL}/users`, { params: { name, page, pageSize } });
        return response.data;
    },

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        const response = await axios.post(`${SNIPPET_MANAGER_API_URL}/snippets/${snippetId}/share`, { userId });
        return response.data;
    },

    async getFormatRules(): Promise<Rule[]> {
        const response = await axios.get(`${CODE_PROCESSING_API_URL}/formatRules`);
        return response.data;
    },

    async modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await axios.post(`${CODE_PROCESSING_API_URL}/formatRules`, newRules);
        return response.data;
    },

    async getLintingRules(): Promise<Rule[]> {
        const response = await axios.get(`${CODE_PROCESSING_API_URL}/lintingRules`);
        return response.data;
    },

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await axios.post(`${CODE_PROCESSING_API_URL}/lintingRules`, newRules);
        return response.data;
    },

    async getTestCases(): Promise<TestCase[]> {
        const response = await axios.get(`${SNIPPET_MANAGER_API_URL}/testCases`);
        return response.data;
    },

    async formatSnippet(snippet: string): Promise<string> {
        const response = await axios.post(`${CODE_PROCESSING_API_URL}/formatSnippet`, { content: snippet });
        return response.data;
    },

    async postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
        const response = await axios.post(`${SNIPPET_MANAGER_API_URL}/testCases`, testCase);
        return response.data;
    },

    async removeTestCase(id: string): Promise<string> {
        const response = await axios.delete(`${SNIPPET_MANAGER_API_URL}/testCases/${id}`);
        return response.data;
    },

    async deleteSnippet(id: string): Promise<string> {
        const response = await axios.delete(`${SNIPPET_MANAGER_API_URL}/snippets/${id}`);
        return response.data;
    },

    async testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        const response = await axios.post(`${CODE_PROCESSING_API_URL}/testSnippet`, testCase);
        return response.data;
    },

    // Get supported languages
    async getFileTypes(): Promise<FileType[]> {
        // const token = await GetToken();
        const response = await axios.get(`${CODE_PROCESSING_API_URL}/fileTypes/getTypes`, {
            // headers: {
            //     Authorization: `Bearer ${token}`
            // }
        });
        return response.data;
    }
}
