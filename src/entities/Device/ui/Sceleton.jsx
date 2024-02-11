import ContentLoader from 'react-content-loader';

const Sceleton = (props) => (
  <ContentLoader speed={2} width={283} height={438} viewBox="0 0 283 438" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
    <rect x="0" y="0" rx="10" ry="10" width="283" height="228" />
    <rect x="0" y="244" rx="10" ry="10" width="283" height="90" />
    <rect x="0" y="344" rx="10" ry="10" width="283" height="30" />
    <rect x="15" y="385" rx="10" ry="10" width="253" height="40" />
  </ContentLoader>
);

export default Sceleton;
