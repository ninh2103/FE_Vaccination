import axiosClient from '@/core/services/axios-client'
import { TagResponseType } from '@/schemaValidator/tag.schema'

interface ListTagQuery {
  page?: number
  items_per_page?: number
  search?: string
}

const API_TAG_URL = '/api/tags'

export const tagService = {
  listTags(query: ListTagQuery): Promise<TagResponseType> {
    return axiosClient.get(API_TAG_URL, { params: query })
  }
}
