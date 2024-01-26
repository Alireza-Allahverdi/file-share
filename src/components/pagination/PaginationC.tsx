import { TablePagination, ThemeProvider, createTheme } from "@mui/material";

interface paginationProps {
  itemsCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const PaginationC: React.FC<paginationProps> = ({
  itemsCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  
  const theme = createTheme({
    palette: {
      mode: localStorage.theme,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TablePagination
        component="div"
        count={itemsCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </ThemeProvider>
  );
};

export default PaginationC;
