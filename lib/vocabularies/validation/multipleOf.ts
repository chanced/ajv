import {CodeKeywordDefinition} from "../../types"
import KeywordCtx from "../../compile/context"
// import {bad$DataType} from "../util"
import {_, str} from "../../compile/codegen"

const def: CodeKeywordDefinition = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: true,
  code(cxt: KeywordCtx) {
    const {gen, data, schemaCode, it} = cxt
    // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
    const prec = it.opts.multipleOfPrecision
    const res = gen.let("res")
    const invalid = prec
      ? _`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
      : _`${res} !== parseInt(${res})`
    cxt.fail$data(_`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`)
  },
  error: {
    message: ({schemaCode}) => str`should be multiple of ${schemaCode}`,
    params: ({schemaCode}) => _`{multipleOf: ${schemaCode}}`,
  },
}

module.exports = def
