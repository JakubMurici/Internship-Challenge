/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */
parser = (ctx) => {
  if (!ctx.datasource.SelectedUser) {
    return {}
  }
  /** @type {FormSourceObj} */
  var formSourceObj = {
    data: {
      ...ctx.datasource.UserList.find((u) => u.user_id === ctx.datasource.SelectedUser),
      roles: ctx.datasource.SelectedUserRoles ? ctx.datasource.SelectedUserRoles.map((r) => ({
        name: r.Name,
        value: r.ID
      })) : []
    },
    overrideFieldSettings: {
      roles: {
        dropdownOptions: ctx.datasource.Roles ? ctx.datasource.Roles.map((r) => ({
          name: r.Name,
          value: r.ID
        })) : []
      }
    },
    // onUpdate: ({ currentValues, fieldSettings }) => { return { currentValues, fieldSettings }}
  };

  return formSourceObj
}