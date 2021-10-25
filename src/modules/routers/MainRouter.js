import React, {lazy, Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from 'components/common/Loading';
import MainLayout from 'layouts/MainLayout';

//
const Mypage = lazy(() => import('pages/main/member/mypage'));
const History = lazy(() => import('pages/main/member/history'))
const Main = lazy(() => import('pages/main'));
const Dashboards = lazy(() => import('pages/main/dashboards/dashboards'));
const News = lazy(() => import('pages/main/news/news'));
const NewsLetter = lazy(() => import('pages/main/news/newsLetter'));
const NewsScrap = lazy(() => import('pages/main/news/newsScrap'));
const CompanyMng = lazy(() => import('pages/main/companyMng/companyMng'));
const AbsenteeismMng = lazy(() => import('pages/main/absenteeismMng/absenteeismMng'));
const Absenteeism = lazy(()=> import('pages/main/absenteeism/absenteeism'));
const FundMng = lazy(() => import('pages/main/fundMng/fundMng'));
const IssueSubmitED = lazy(() => import('pages/main/issueSubmitED/issueSubmitED'));
const CallingCard = lazy(() => import('pages/main/callingCard/callingCard'));
const AccountingCountry = lazy(() => import('pages/main/accountingCountry/accountingCountry'));
const SmartBill = lazy(() => import('pages/main/smartBill/smartBill'));
const EcountERP = lazy(() => import('pages/main/ecountERP/ecountERP'));
const MonitoringAccounts = lazy(() => import('pages/main/monitoringAccounts/monitoringAccounts'));
const CorporateRelationNetwork = lazy(() => import('pages/main/corporateRelationNetwork/corporateRelationNetwork'));
const ValueAppCRE = lazy(() => import('pages/main/valueAppCRE/valueAppCRE'));
const Flow = lazy(() => import('pages/main/flow/flow'));
const Loans = lazy(() => import('pages/main/loans/loans'));
const PolicyFund = lazy(() => import('pages/main/policyFund/policyFund'));
const DiscountOnElecBill = lazy(() => import('pages/main/discountOnElecBill/discountOnElecBill'));
const InvestmentIC = lazy(() => import('pages/main/investmentIC/investmentIC'));
const Insight = lazy(() => import('pages/main/insight/insight'));
const MarketDev = lazy(() => import('pages/main/marketDev/marketDev'));
const ProducerNetwork = lazy(() => import('pages/main/producerNetwork/producerNetwork'));
const IMarket = lazy(() => import('pages/main/iMarket/iMarket'));
const SellerHub = lazy(() => import('pages/main/sellerHub/sellerHub'));
const IONEJOB = lazy(() => import('pages/main/iOneJob/iOneJob'));
const HunetCyberResearch = lazy(() => import('pages/main/hunetCyberResearch/hunetCyberResearch'));
const BroadcastingAd = lazy(() => import('pages/main/broadcastingAd/broadcastingAd'));

const MainRouter = (props) => {
    const {match} = props;    
    return (
        <MainLayout>
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route exact path={`${match.url}/mypage`} component={() => <Mypage {...props}/>} />
                    <Route exact path={`${match.url}/history`} component={() => <History {...props}/>} />
                    <Route exact path={`${match.url}`} component={() => <Main {...props}/>} />
                    <Route exact path={`${match.url}/dashboards`} component={() => <Dashboards {...props}/>} />
                    <Route exact path={`${match.url}/news`} component={() => <News {...props}/>} />
                    <Route exact path={`${match.url}/news/newsletter`} component={() => <NewsLetter {...props}/>} />
                    <Route exact path={`${match.url}/news/newsscrap`} component={() => <NewsScrap {...props}/>} />
                    <Route exact path={`${match.url}/companyMng`} component={() => <CompanyMng {...props}/>} />
                    <Route exact path={`${match.url}/absenteeismMng`} component={() => <AbsenteeismMng {...props}/>} />
                    <Route exact path={`${match.url}/absenteeism`} component={() => <Absenteeism {...props}/>} />
                    <Route exact path={`${match.url}/fundMng`} component={() => <FundMng {...props}/>} />
                    <Route exact path={`${match.url}/issueSubmitED`} component={() => <IssueSubmitED {...props}/>} />
                    <Route exact path={`${match.url}/callingCard`} component={() => <CallingCard {...props}/>} />
                    <Route exact path={`${match.url}/accountingCountry`} component={() => <AccountingCountry {...props}/>} />
                    <Route exact path={`${match.url}/smartBill`} component={() => <SmartBill {...props}/>} />
                    <Route exact path={`${match.url}/ecountERP`} component={() => <EcountERP {...props}/>} />
                    <Route exact path={`${match.url}/monitoringAccounts`} component={() => <MonitoringAccounts {...props}/>} />
                    <Route exact path={`${match.url}/corporateRelationNetwork`} component={() => <CorporateRelationNetwork {...props}/>} />
                    <Route exact path={`${match.url}/valueAppCRE`} component={() => <ValueAppCRE {...props}/>} />
                    <Route exact path={`${match.url}/flow`} component={() => <Flow {...props}/>} />
                    <Route exact path={`${match.url}/loans`} component={() => <Loans {...props}/>} />
                    <Route exact path={`${match.url}/policyFund/policyFund`} component={() => <PolicyFund {...props}/>} />
                    <Route exact path={`${match.url}/discountOnElecBill`} component={() => <DiscountOnElecBill {...props}/>} />
                    <Route exact path={`${match.url}/investmentIC`} component={() => <InvestmentIC {...props}/>} />
                    <Route exact path={`${match.url}/insight`} component={() => <Insight {...props}/>} />
                    <Route exact path={`${match.url}/marketDev`} component={() => <MarketDev {...props}/>} />
                    <Route exact path={`${match.url}/producerNetwork`} component={() => <ProducerNetwork {...props}/>} />
                    <Route exact path={`${match.url}/iMarket`} component={() => <IMarket {...props}/>} />
                    <Route exact path={`${match.url}/sellerHub`} component={() => <SellerHub {...props}/>} />
                    <Route exact path={`${match.url}/iOneJob`} component={() => <IONEJOB {...props}/>} />
                    <Route exact path={`${match.url}/hunetCyberResearch`} component={() => <HunetCyberResearch {...props}/>} />
                    <Route exact path={`${match.url}/broadcastingAd`} component={() => <BroadcastingAd {...props}/>} />
                </Switch>
            </Suspense>
        </MainLayout>
    )
}

export default MainRouter;