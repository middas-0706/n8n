import type { IExecutionsCurrentSummaryExtended, IRestApiContext } from '@/Interface';
import type { ExecutionFilters, ExecutionOptions, IDataObject } from 'n8n-workflow';
import { makeRestApiRequest } from '@/utils/apiUtils';

export async function getNewWorkflow(context: IRestApiContext, name?: string) {
	const response = await makeRestApiRequest(context, 'GET', '/workflows/new', name ? { name } : {});
	return {
		name: response.name,
		onboardingFlowEnabled: response.onboardingFlowEnabled === true,
		settings: response.defaultSettings,
	};
}

export async function getWorkflow(context: IRestApiContext, id: string, filter?: object) {
	const sendData = filter ? { filter } : undefined;

	return await makeRestApiRequest(context, 'GET', `/workflows/${id}`, sendData);
}

export async function getWorkflows(context: IRestApiContext, filter?: object) {
	const sendData = filter ? { filter } : undefined;

	return await makeRestApiRequest(context, 'GET', '/workflows', sendData);
}

export async function getActiveWorkflows(context: IRestApiContext) {
	return await makeRestApiRequest(context, 'GET', '/active-workflows');
}

export async function getCurrentExecutions(context: IRestApiContext, filter: IDataObject) {
	return await makeRestApiRequest(context, 'GET', '/executions-current', { filter });
}

export async function getExecutions(
	context: IRestApiContext,
	filter?: ExecutionFilters,
	options?: ExecutionOptions,
): Promise<{ count: number; results: IExecutionsCurrentSummaryExtended[]; estimated: boolean }> {
	return await makeRestApiRequest(context, 'GET', '/executions', { filter, ...options });
}

export async function getExecutionData(context: IRestApiContext, executionId: string) {
	return await makeRestApiRequest(context, 'GET', `/executions/${executionId}`);
}
