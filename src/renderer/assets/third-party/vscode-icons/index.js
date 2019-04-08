import fileTypeDefault from '@/assets/third-party/vscode-icons/icons/default_file.svg';
import fileTypePhp from '@/assets/third-party/vscode-icons/icons/file_type_php3.svg';
import fileTypeImage from '@/assets/third-party/vscode-icons/icons/file_type_image.svg';
import fileTypeSql from '@/assets/third-party/vscode-icons/icons/file_type_sql.svg';
import fileTypeDoc from '@/assets/third-party/vscode-icons/icons/file_type_word.svg';

import folderIcon from '@/assets/third-party/vscode-icons/icons/default_folder.svg';

export default {
  fileIcons: {
    default: fileTypeDefault,
    doc: fileTypeDoc,
    png: fileTypeImage,
    php: fileTypePhp,
    sql: fileTypeSql,
  },
  getIcon(fileName) {
    const matches = fileName.match(/\.(.*)/);
    if (!matches || matches.length < 2) {
      return this.fileIcons.default;
    }

    const fileType = matches[1];

    if (typeof this.fileIcons[fileType] === 'undefined') {
      return this.fileIcons.default;
    }

    return this.fileIcons[fileType];
  },
  getFolderIcon() {
    return folderIcon;
  },
};
