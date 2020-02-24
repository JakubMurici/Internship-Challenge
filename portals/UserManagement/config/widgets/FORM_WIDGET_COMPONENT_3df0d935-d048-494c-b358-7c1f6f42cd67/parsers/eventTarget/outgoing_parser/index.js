/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */
parser = (ctx) => {
  const data = ctx.widget.data;
  const changes = {};
  if (data.roles.length !== datasources.SelectedUserRoles.latestData().length) {
    changes.roles = getDiff(datasources.SelectedUserRoles.latestData().map((r) => r.ID), data.roles)
  }
  if (data.changePassword) {
    changes.password = data.changePassword;
  }
  if (Object.keys(changes).length > 0) {
    datasources.UserManagement.sendData({
      user: data.user_id,
      changes,
    }).then(() => {
      datasources.SelectedUserRoles.sendData({ method: 'GET', data: { user: data.user_id } })
    })
  }
  return datasources.UserList.sendData({ method: 'UPDATE', data: data, query: CB_PORTAL.ClearBlade.Query().equalTo('email', data.email) })
}

function getDiff(orig, curr) {
  return {
    add: filter(curr, orig),
    delete: filter(orig, curr)
  };
}

function filter(a, b) {
  return a.filter(aItem => b.findIndex(bItem => bItem === aItem) === -1);
}
