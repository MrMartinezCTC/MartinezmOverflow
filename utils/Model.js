
// export const _maxLength = (field, max) => [max, `${field} can not contain more than ${max} characters`];
// export const _minLength = (field, min) => [min, `${field} must contain at least ${min} characters`];
// export const _required = field => [true, `a value for ${field} must be provided.`];
module.exports._maxLength = (field, max) => [max, `${field} can not contain more than ${max} characters`];
module.exports._minLength = (field, min) => [min, `${field} must contain at least ${min} characters`];
module.exports._required = field => [true, `a value for ${field} must be provided.`];







