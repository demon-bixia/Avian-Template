export interface Value { value: string | File | boolean | undefined, id: number, groupId: number }

export interface TextValue {
    value: string
    id: number
    groupId: number
}

export interface FileValue { value: File | undefined, id: number, groupId: number, }

export interface BooleanValue {
    value: boolean
    id: number
    groupId: number
}

export type FileOrTextValue = TextValue | FileValue;
