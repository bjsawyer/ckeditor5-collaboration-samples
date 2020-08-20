import { CKEditor5 } from '@ckeditor/ckeditor5-angular'
import { of } from 'rxjs'

export interface ITrackChangesData {
  userId: string
  users: { id: string; name: string }[]
  suggestions: {
    id: string
    type: string
    authorId: string
    createdAt: Date
    hasComments: boolean
    data?: {
      commandName: string
      commandParams: { value?: string; forceValue?: boolean }[]
      formatGroupId?: string
      multipleBlocks?: false
    }
  }[]
  comments: {
    threadId: string
    comments: {
      commentId: string
      content: string
      authorId: string
      createdAt: Date
    }[]
  }[]
}

export function getTrackChangesAdapter(initialData?: ITrackChangesData) {
  return class TrackChangesAdapter {
    editor: CKEditor5.Editor
    initialData: ITrackChangesData

    constructor(editor: CKEditor5.Editor) {
      this.editor = editor
      this.initialData = initialData
    }

    init(): void {
      const usersPlugin = this.editor.plugins.get('Users')
      const trackChangesPlugin = this.editor.plugins.get('TrackChanges')
      const commentsRepositoryPlugin = this.editor.plugins.get('CommentsRepository')

      for (const user of this.initialData.users) {
        usersPlugin.addUser(user) // Load the users data
      }

      usersPlugin.defineMe(this.initialData.userId) // Set the current user
      trackChangesPlugin.adapter = this.buildTrackChangesAdapter()
      commentsRepositoryPlugin.adapter = this.buildCommentsAdapter()
    }

    private buildTrackChangesAdapter(): any {
      return {
        getSuggestion: (suggestionId) => {
          // This function should query the database for data for a suggestion with a `suggestionId`
          return of(
            this.initialData.suggestions.find(
              (suggestion) => suggestionId === suggestion.id
            )
          ).toPromise()
        },
        addSuggestion: (suggestionData) => {
          // This function should save `suggestionData` in the database.
          return of({
            createdAt: new Date(),
          }).toPromise()
        },
        updateSuggestion: (id, suggestionData) => {
          // This function should update `suggestionData` in the database.
          return of().toPromise()
        },
      }
    }

    private buildCommentsAdapter(): any {
      return {
        getCommentThread: ({ threadId }) => {
          // This function should query the database for data for the comment thread with a `commentThreadId`.
          return of(
            this.initialData.comments.find((comment) => threadId === comment.threadId)
          ).toPromise()
        },
        addComment: (data) => {
          // This function should save `data` in the database.
          return of({
            createdAt: new Date(),
          }).toPromise()
        },
        updateComment: (data) => {
          // This function should save `data` in the database.
          return of().toPromise()
        },
        removeComment: (data) => {
          // This function should remove the comment of a given `data` from the database.
          return of().toPromise()
        },
        removeCommentThread: (data) => {
          // This function should remove the comment of a given `data` from the database.
          return of().toPromise()
        },
      }
    }
  }
}
