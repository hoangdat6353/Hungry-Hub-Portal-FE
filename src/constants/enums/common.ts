import { BasePaginationRequest } from '@app/domain/ApiModel';

export const ALPHABET_CHARACTER_LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
export const ALPHABET_CHARACTER_UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const NUMBER = '0123456789';
export const SYMBOLS_CHARACTER = '!@#$%^&*()_+~`|}{[\\]:;?><,./-=';
export const PATTERN_SPECIAL_CHARACTER = /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/;
export const APPLICATION_PDF_DOCS = 'application/pdf, .docx';
export const DEFAULT_TOTAL_ITEM_PAGE = 100;
export const APPLICATION_IMAGES = 'image/*';
export const APPLICATION_PDF = 'pdf/*, ';

export const DEFAULT_PAGINATION: BasePaginationRequest = {
  page: 1,
  perPage: 10,
  sortBy: 'created',
  sortType: 'asc',
};

export enum LanguageCode {
  EN = 'EN',
  VI = 'VI',
}

export enum SorterType {
  descend = 'descend',
  ascend = 'ascend',
}
