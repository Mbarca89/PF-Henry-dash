import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';

const Products = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
        <TableTwo />
        <TableOne />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Products;
