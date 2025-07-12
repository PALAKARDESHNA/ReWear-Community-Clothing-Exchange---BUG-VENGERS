import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import Visibility from '@mui/icons-material/Visibility';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Warning from '@mui/icons-material/Warning';
import TrendingUp from '@mui/icons-material/TrendingUp';
import People from '@mui/icons-material/People';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';

const AdminPanel = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  // Mock admin data
  const stats = {
    totalItems: 1247,
    pendingApproval: 23,
    approvedToday: 15,
    rejectedToday: 3,
    totalUsers: 892,
    activeUsers: 456,
  };

  // Mock pending items
  const pendingItems = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      uploader: 'Sarah M.',
      category: 'Outerwear',
      condition: 'Excellent',
      points: 150,
      submittedDate: '2024-01-15',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      title: 'Summer Dress',
      uploader: 'Mike R.',
      category: 'Dresses',
      condition: 'Good',
      points: 100,
      submittedDate: '2024-01-14',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      title: 'Formal Shirt',
      uploader: 'David K.',
      category: 'Tops',
      condition: 'Excellent',
      points: 80,
      submittedDate: '2024-01-13',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailDialog(true);
  };

  const handleAction = (item, type) => {
    setSelectedItem(item);
    setActionType(type);
    setShowActionDialog(true);
  };

  const handleApprove = () => {
    // Mock approve action
    console.log('Approved item:', selectedItem.id);
    setShowActionDialog(false);
    setSelectedItem(null);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      return;
    }
    // Mock reject action
    console.log('Rejected item:', selectedItem.id, 'Reason:', rejectionReason);
    setShowActionDialog(false);
    setSelectedItem(null);
    setRejectionReason('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Panel
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Moderate and manage the ReWear community
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ShoppingBag sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" component="div" fontWeight="bold">
                {stats.totalItems}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Warning sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" component="div" fontWeight="bold">
                {stats.pendingApproval}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Approval
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" component="div" fontWeight="bold">
                {stats.totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" component="div" fontWeight="bold">
                {stats.activeUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Pending Items" />
            <Tab label="Approved Items" />
            <Tab label="Rejected Items" />
            <Tab label="User Management" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Uploader</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Condition</TableCell>
                    <TableCell>Points</TableCell>
                    <TableCell>Submitted</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={item.image}
                            variant="rounded"
                            sx={{ width: 50, height: 50 }}
                          />
                          <Typography variant="subtitle2">
                            {item.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.uploader}</TableCell>
                      <TableCell>
                        <Chip label={item.category} size="small" />
                      </TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>{item.points} pts</TableCell>
                      <TableCell>{item.submittedDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          color={getStatusColor(item.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleViewDetails(item)}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Approve">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleAction(item, 'approve')}
                            >
                              <CheckCircle />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleAction(item, 'reject')}
                            >
                              <Cancel />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {tabValue === 1 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Approved Items
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No approved items to display
              </Typography>
            </Box>
          )}

          {tabValue === 2 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Rejected Items
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No rejected items to display
              </Typography>
            </Box>
          )}

          {tabValue === 3 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                User Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User management features coming soon
              </Typography>
            </Box>
          )}
        </Box>
      </Card>

      {/* Item Detail Dialog */}
      <Dialog
        open={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Item Details</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  {selectedItem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Uploaded by: {selectedItem.uploader}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={selectedItem.category} size="small" />
                  <Chip label={selectedItem.condition} size="small" variant="outlined" />
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  {selectedItem.points} points
                </Typography>
                <Typography variant="body2" paragraph>
                  Submitted on: {selectedItem.submittedDate}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetailDialog(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Dialog */}
      <Dialog
        open={showActionDialog}
        onClose={() => setShowActionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {actionType === 'approve' ? 'Approve Item' : 'Reject Item'}
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box>
              <Typography variant="body1" paragraph>
                {actionType === 'approve'
                  ? `Are you sure you want to approve "${selectedItem.title}"?`
                  : `Are you sure you want to reject "${selectedItem.title}"?`
                }
              </Typography>
              
              {actionType === 'reject' && (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Rejection Reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowActionDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={actionType === 'approve' ? 'success' : 'error'}
            onClick={actionType === 'approve' ? handleApprove : handleReject}
            disabled={actionType === 'reject' && !rejectionReason.trim()}
          >
            {actionType === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPanel; 