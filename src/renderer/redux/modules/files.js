import { newWorkspace, loadWorkspace } from '../../system/buttercup/archive';
import { showPasswordDialog } from '../../system/dialog';
import { setWorkspace } from './workspace';

// Constants ->

export const OPEN = 'buttercup/files/OPEN';
export const NEW = 'buttercup/files/NEW';
export const CANCELLED = 'buttercup/files/CANCELLED';

// Action Creators ->

const fileAction = (filename, dispatch, fn) => {
  showPasswordDialog(password => {
    return fn(filename, password);
  }).then(() => {
    dispatch(setWorkspace(filename));
  })
  .catch(err => {
    dispatch({
      type: CANCELLED,
      payload: {
        filename,
        reason: err
      }
    });
  });
};

export const createNewFile = filename => dispatch => {
  fileAction(filename, dispatch, newWorkspace);
};

export const openFile = filename => dispatch => {
  fileAction(filename, dispatch, loadWorkspace);
};

export const newArchive = () => () => {
  window.rpc.emit('new-file-dialog');
};

export const openArchive = () => () => {
  window.rpc.emit('open-file-dialog');
};
