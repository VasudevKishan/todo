import { apiSlice } from '../apiSlice';
import { RootState } from '../store';

export interface Project {
  _id: string;
  projectName: string;
  userId: string;
}

export interface GetMyProjectsResponse {
  projects: Project[];
}

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /myprojects
    getMyProjects: builder.query<GetMyProjectsResponse, void>({
      query: () => '/myprojects',

      providesTags: (result) =>
        result
          ? [
              ...result.projects.map(({ _id }) => ({
                type: 'Project' as const,
                id: _id,
              })),
              { type: 'Project', id: 'LIST' },
            ]
          : [{ type: 'Project', id: 'LIST' }],
      transformResponse: (response: GetMyProjectsResponse) => ({
        projects: response.projects
          .slice()
          .sort((a, b) => a.projectName.localeCompare(b.projectName)),
      }),
    }),

    // POST /myprojects
    createProject: builder.mutation<
      { message: string },
      { projectName: string }
    >({
      query: ({ projectName }) => ({
        url: '/myprojects',
        method: 'POST',
        body: { projectName },
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),

    // PATCH /myprojects/:projectId
    updateProject: builder.mutation<
      { message: string },
      { projectId: string; projectName: string }
    >({
      query: ({ projectId, projectName }) => ({
        url: `/myprojects/${projectId}`,
        method: 'PATCH',
        body: { projectName },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Project', id: arg.projectId },
      ],
    }),

    // DELETE /myprojects/:projectId
    deleteProject: builder.mutation<{ message: string }, { projectId: string }>(
      {
        query: ({ projectId }) => ({
          url: `/myprojects/${projectId}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_result, _error, arg) => [
          { type: 'Project', id: arg.projectId },
          { type: 'Project', id: 'LIST' },
        ],
      }
    ),
  }),
});

export const selectProjectNameById =
  (projectId: string | undefined) =>
  (state: RootState): string | undefined => {
    if (!projectId) return undefined;

    const projectsResult =
      projectsApiSlice.endpoints.getMyProjects.select()(state);

    return projectsResult.data?.projects.find((p) => p._id === projectId)
      ?.projectName;
  };

export const {
  useGetMyProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;
